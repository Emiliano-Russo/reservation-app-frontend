import { StarFilled } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

interface Props {
  avatarUrl: string;
  name: string;
  rating: number;
  comment: string;
}

export const FeedbackCard = (item: Props) => {
  return (
    <div
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        borderRadius: '10px',
        padding: '10px',
        margin: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
            width: '50%',
          }}
        >
          <Avatar src={item.avatarUrl} />
          <p style={{ paddingLeft: '10px' }}>{item.name}</p>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <p>{item.rating}</p>
          <StarFilled style={{ color: 'gold' }} />
        </div>
      </div>
      <p style={{ color: 'gray' }}>{item.comment}</p>
    </div>
  );
};
