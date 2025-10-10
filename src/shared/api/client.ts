import { redirect } from '@tanstack/react-router';
import axios from 'axios';

// TODO: 로그인 시스템 모듈로 변경
const useServiceAuthManager = {
  getState: () => ({
    accessToken: '', // 스토리지 토큰
    clearTokens: () => {}, // 스토리지 토큰 삭제
    tokenRefresh: () => ({ accessToken: '' }), // 토큰 갱신 api
  }),
};

// 토큰 갱신 상태를 추적하는 변수
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error?: unknown) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (token: string) => {
  // 성공한 경우 실제 API 호출을 순차적으로 실행
  const executeRequestsSequentially = async () => {
    failedQueue.forEach(({ resolve }) => {
      try {
        resolve(token);
      } catch {
        return;
      }
    });
  };

  executeRequestsSequentially();

  // 큐 초기화
  failedQueue = [];
};

const processQueueError = (error: unknown) => {
  // 큐에 있던 요청 에러
  failedQueue.forEach(({ reject }) => {
    reject(error);
  });

  // 큐 초기화
  failedQueue = [];
};

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // timeout: 10000,
  // headers: {
  //   'Access-Control-Allow-Origin': import.meta.env.VITE_API_URL,
  // },
});

export const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: 토큰과 언어를 헤더에 자동 추가
client.interceptors.request.use(
  (config) => {
    const accessToken = useServiceAuthManager.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // TODO: 현재 I18n 언어를 헤더에 추가
    // const currentLanguage = i18next.language;
    const currentLanguage = 'ko';
    if (currentLanguage) {
      config.headers['Accept-Language'] = currentLanguage;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

refreshClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 갱신 실패 시 로그아웃 처리
      useServiceAuthManager.getState().clearTokens();
      // TODO: 로그인 페이지로 리다이렉트
      redirect({ to: '/' });
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 자동 갱신
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // 401 에러이고 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 1번과 동시에 요청된 API를 큐에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            // 큐 처리 후 갱신된 토큰으로 재시도
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          })
          .catch((err) => {
            // 큐에 있던 요청 에러
            return Promise.reject(err);
          });
      }

      // 1번 요청이 갱신 상태로 변경
      isRefreshing = true;

      try {
        // 토큰 갱신 요청 (인증 헤더 없이)
        const { accessToken: newAccessToken } = await useServiceAuthManager
          .getState()
          .tokenRefresh();

        try {
          // 원래 요청 재시도
          // 실행순서 처리 1번 -> 후속 큐 처리
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (requestError) {
          return Promise.reject(requestError);
        } finally {
          // 대기 중인 요청들 처리
          processQueue(newAccessToken);
        }
      } catch (refreshError) {
        // 대기 중인 큐 요청들 모두 해제 및 에러 반환
        processQueueError(refreshError);

        // 토큰 갱신 실패 시 로그아웃 처리
        useServiceAuthManager.getState().clearTokens();
        // TODO: 로그인 페이지로 리다이렉트
        redirect({ to: '/' });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
