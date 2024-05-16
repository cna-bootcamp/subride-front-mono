import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'utils/apiInstance';
import BackHeader from 'components/BackHeader';

const ServiceDetailContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const ServiceName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CategoryName = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const FeeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const FeeLabel = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #f8a809;
  margin-right: 0.5rem;
`;

const FeeAmount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #f8a809;
`;

const MaxUser = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: 33.33vh;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const SubscribeButton = styled(Button)`
  && {
    background-color: #f8a809;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.8rem 1.6rem;
    margin-top: 1rem;
    &:hover {
      background-color: #e09a07;
    }
  }
`;

function ServiceDetail({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceId = location.state?.serviceId;
  const alreadyEnroll = location.state?.alreadyEnroll || false;
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await api.get(`/subscribe/detail`, {
          params: { id: serviceId },
        });
        setService(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        userId: user.id,
        subscribeId: service.serviceId,
        billingDate: 5, // 예시로 5일로 설정
      };
      const { data } = await api.post('/subscribe/enroll', requestBody);
      toast.success(data.message, {
        onClose: () =>
          navigate('/subscription/mysubscription', { state: { from: '/subscription/service/' + serviceId } }),
        
        position: 'top-center',
        autoClose: 300, //  자동으로 사라짐
        hideProgressBar: true, // 진행바 숨김
        closeOnClick: true, // 클릭 시 닫힘
        pauseOnHover: false, // 마우스 오버 시 자동 닫힘 일시 정지
        draggable: false, // 드래그 가능
      });
    } catch (err) {
      toast.error('구독 등록에 실패했습니다.', { autoClose: 300 });
      setIsLoading(false);
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackHeader text={service.serviceName} navigate={navigate} />
      <ServiceDetailContainer>
        <LogoImage
          src={process.env.PUBLIC_URL + `/service/` + service.logo}
          alt={service.serviceName}
        />
        <ServiceName>{service.serviceName}</ServiceName>
        <CategoryName>{service.categoryName}</CategoryName>
        <Description>{service.description}</Description>
        <FeeContainer>
          <FeeLabel>금액:</FeeLabel>
          <FeeAmount>{service.fee.toLocaleString('ko-KR')}원</FeeAmount>
        </FeeContainer>
        <MaxUser>최대 {service.maxUser}명 참여 가능</MaxUser>
        {!alreadyEnroll && (
          <SubscribeButton onClick={handleSubscribe} disabled={isLoading}>
            {isLoading ? '구독 중...' : '구독하기'}
          </SubscribeButton>
        )}
      </ServiceDetailContainer>
    </>
  );
}

export default ServiceDetail;