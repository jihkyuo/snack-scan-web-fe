import type { CreateMemberForm } from '@/domain/members/entities/api/member.dto';
import { client } from '@/shared/api/client';

export const getMembersApi = async () => {
  return (await client.get('/members')).data;
};

export const createMemberApi = async (formValues: CreateMemberForm) => {
  return (await client.post('/members', formValues)).data;
};
