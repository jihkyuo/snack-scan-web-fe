import { downloadSalesTemplate } from '@/domain/sales/features/uploadStoreSalesBulk/utils/downloadTemplate';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

const { Text } = Typography;

export const TemplateDownloadSection = () => {
  return (
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <Text type="secondary">
        엑셀 파일을 업로드하여 매출 데이터를 일괄 등록하세요
      </Text>
      <Button
        icon={<DownloadOutlined />}
        onClick={downloadSalesTemplate}
        size="small"
      >
        템플릿 다운로드
      </Button>
    </Space>
  );
};
