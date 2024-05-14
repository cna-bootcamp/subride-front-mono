import styled from "@emotion/styled";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close"; // CloseIcon 추가
import { toast } from 'react-toastify';
import BackHeader from "components/BackHeader";
import api from "utils/apiInstance";

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100dvw;
  height: 356px;
  background-color: #fed337;
  position: absolute;
  left: 0px;
  padding: 30px;

  .servicelogoImg {
    width: 100px;
    height: 100px;
    display: block;
    margin: 2px auto;
    position: absolute;
    bottom: 30px;
    top: 22px;
  }

  .informContainer {
    margin-top: 70px;
    background-color: #ffffff;
    width: 323px;
    height: 160px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .serviceName {
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
    font-family: "KBFGTextM";
    text-align: center;
  }

  .serviceDescription {
    font-size: 14px;
    margin-top: 5px;
    font-family: "KBFGTextM";
    text-align: center;
  }

  .characerNameImgContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .characterImgContainter {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
  }

  .characterImg {
    width: 73px;
    height: 73px;
    margin: 2px auto;
  }

  .characterName {
    margin-top: 5px;
    color: #6f6a6a;
    font-size: 12px;
  }

  .placeholderCharacterImg {
    width: 73px;
    height: 73px;
    margin: 2px auto;
    filter: grayscale(100%);
    opacity: 0.5;
  }
`;

const InvitationButtonContainer = styled.div`
  position: absolute;
  top: 386px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const InvitationButton = styled(Button)`
  background-color: #f8a809;
  color: #ffffff;
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  text-transform: none;

  &:hover {
    background-color: #e09a07; // 마우스 오버 시 배경색 변경
  }
`;

const PaymentDetailSearchContainer = styled.div`
  position: absolute;
  top: 426px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: solid #eeeeee;

  .searchText {
    display: flex;
    align-items: center;
  }

  .searchTextD {
    margin-right: 9px;
    font-size: 12px;
    color: #767676;
  }

  .selectedButton {
    color: #f8a809;
    font-weight: bold;
  }

  .sortButtons {
    display: flex;
    align-items: center;
  }
`;

const PaymentDetailContainer = styled.div`
  position: absolute;
  top: 467.5px;
  left: 0px;
  width: 100%;
  padding: 0 10px;
  border-bottom: solid #eeeeee;

  .newcss {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid #eeeeee;
  }

  .firstClass {
    display: flex;
    align-items: center;
  }

  .item {
    margin: 0 10px;
    font-family: "KBFGTextM";
  }
`;

function GroupDetail() {
  const location = useLocation();
  const groupId = location.state?.groupId || null;

  const [serviceData, setServiceData] = useState({
    subscribeDTO: { logo: "", serviceName: "", description: "", maxUser: 0 },
    users: [],
    groupName: "",
    billingDate: 0,
    pays: [],
  });
  const [filteredPays, setFilteredPays] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState("3개월");
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 상태

  const getServiceData = useCallback(async () => {
    try {
      if (groupId !== null) {
        const { data } = await api.get("/group/detail", {
          params: { id: groupId },
        });
        setServiceData(data);
      }
    } catch (err) {
      console.log("error");
    }
  }, [groupId]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);

  useEffect(() => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const filteredData = serviceData.pays.filter((item) => {
      const paymentDate = new Date(item.payDateTime);
      return paymentDate >= threeMonthsAgo;
    });
    const sortedPays = [...filteredData].sort((a, b) => {
      return new Date(b.payDateTime) - new Date(a.payDateTime);
    });
    setFilteredPays(sortedPays);
  }, [serviceData.pays]);

  const calculateFee = useCallback((fee, usersLength) => {
    return Math.ceil(fee / usersLength).toLocaleString("ko-KR");
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    if (filter === "3개월") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
      const filteredData = serviceData.pays.filter((item) => {
        const paymentDate = new Date(item.payDateTime);
        return paymentDate >= oneMonthAgo;
      });
      setFilteredPays(filteredData);
    } else if (filter === "전체") {
      setFilteredPays(serviceData.pays);
    }
  };

  const handleSortClick = () => {
    const sortedData = [...filteredPays].sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(a.payDateTime) - new Date(b.payDateTime);
      } else {
        return new Date(b.payDateTime) - new Date(a.payDateTime);
      }
    });
    setFilteredPays(sortedData);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const copyInvitationCode = () => {
    navigator.clipboard
      .writeText(serviceData.invitationCode)
      .then(() => {
        console.log('Invitation code copied to clipboard');
        setOpenDialog(false);
        toast.success('클립보드에 초대코드가 복사되었어요', {
          position: 'top-center',
          autoClose: 300, //  자동으로 사라짐
          hideProgressBar: true, // 진행바 숨김
          closeOnClick: true, // 클릭 시 닫힘
          pauseOnHover: false, // 마우스 오버 시 자동 닫힘 일시 정지
          draggable: false, // 드래그 가능
        });
      })
      .catch((err) => {
        console.error('Failed to copy invitation code: ', err);
      });
  };

  const renderPlaceholderMembers = () => {
    const placeholderCount = serviceData.subscribeDTO.maxUser - serviceData.users.length;
    const placeholderMembers = [];

    for (let i = 0; i < placeholderCount; i++) {
      placeholderMembers.push(
        <div className="characerNameImgContainer" key={`placeholder-${i}`}>
          <img
            className="placeholderCharacterImg"
            src="/profile/1.png"
            alt="가상 멤버"
          />
        </div>
      );
    }

    return placeholderMembers;
  };

  return (
    <>
      <BackHeader text={serviceData.groupName}></BackHeader>
      <ImgContainer>
        <div>
          <div className="informContainer">
            <img
              className="servicelogoImg"
              src={`/service/${serviceData.subscribeDTO.logo}`}
              alt="로고1"
            />
            <div className="serviceName">
              {serviceData.subscribeDTO.serviceName}
            </div>
            <div className="serviceDescription">
              {serviceData.subscribeDTO.description}
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "17px",
                fontFamily: "KBFGTextM",
              }}
            >
              매달 {serviceData.billingDate}일{" "}
              {calculateFee(
                serviceData.subscribeDTO.fee,
                serviceData.users.length
              )}
              원 결제돼요
            </div>
          </div>
        </div>

        <div className="characterImgContainter">
          {serviceData.users.map((item) => (
            <div className="characerNameImgContainer" key={item.userId}>
              <img
                className="characterImg"
                src={`/profile/${item.profileImg}.png`}
                alt="캐릭터1"
              />
              <div className="characterName">{item.userName}</div>
            </div>
          ))}
          {renderPlaceholderMembers()}
        </div>
      </ImgContainer>

      {serviceData.users.length > 0 && serviceData.subscribeDTO ? (
        serviceData.users.length < serviceData.subscribeDTO.maxUser ? (
          <InvitationButtonContainer>
            <InvitationButton onClick={handleOpenDialog}>
              초대코드 복사하기
            </InvitationButton>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogContent 
                sx={{
                  position: "relative",
                  padding: "16px 24px",
                  display: "flex", // Flex 레이아웃 적용
                  alignItems: "center", // 수직 가운데 정렬
                }}
              >
                <div
                  style={{
                    flex: 1, // 초대코드 텍스트 영역을 확장
                    marginRight: "24px", // 텍스트와 X 버튼 사이 간격
                  }}
                >
                  초대코드: {serviceData.invitationCode}
                </div>

                <DialogActions>
                  <Button onClick={copyInvitationCode}>복사</Button>
                  <CloseIcon
                  onClick={handleCloseDialog}
                  sx={{
                    cursor: "pointer",
                  }}
                  />
                </DialogActions>
              </DialogContent>
            </Dialog>
          </InvitationButtonContainer>
        ) : (
          <InvitationButtonContainer>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              축하해요! 모든 멤버가 구성 되었어요
            </span>
          </InvitationButtonContainer>
        )
      ) : null}

      <PaymentDetailSearchContainer>
        <div className="searchText">
          <Button
            variant="text"
            size="small"
            onClick={() => handleFilterClick("3개월")}
            className={`searchTextD ${
              selectedFilter === "3개월" ? "selectedButton" : ""
            }`}
          >
            3개월
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => handleFilterClick("전체")}
            className={`searchTextD ${
              selectedFilter === "전체" ? "selectedButton" : ""
            }`}
          >
            전체
          </Button>
        </div>
        <div className="sortButtons">
          <Button
            variant="text"
            size="small"
            onClick={handleSortClick}
            className="searchTextD"
          >
            {sortOrder === "desc" ? "날짜순" : "최신순"}
          </Button>
          {sortOrder === "desc" ? (
            <ExpandMoreIcon
              fontSize="small"
              sx={{ color: "#767676", marginLeft: "10px" }}
            />
          ) : (
            <ExpandLessIcon
              fontSize="small"
              sx={{ color: "#767676", marginLeft: "10px" }}
            />
          )}
        </div>
      </PaymentDetailSearchContainer>

      <PaymentDetailContainer>
        {filteredPays.map((item) => (
          <div className="newcss" key={item.id}>
            <div className="firstClass">
              <div className="item" style={{ width: "100px" }}>
                {new Date(item.payDateTime).toLocaleDateString()}
              </div>
              <div className="item" style={{ flexGrow: 1, textAlign: "left" }}>
                <div>{item.username}</div>
                <div style={{ fontSize: "10px", color: "#C59AC9" }}>
                  #자동이체
                </div>
              </div>
              <img
                style={{ paddingLeft: "10px", width: "auto", height: "20px" }}
                src={`/logo/KB로고.png`}
                alt="kb로고"
              />
            </div>

            <div className="item" style={{ fontFamily: "KBFGTextB" }}>
              {calculateFee(
                serviceData.subscribeDTO.fee,
                serviceData.users.length
              )}
              원
            </div>
          </div>
        ))}
      </PaymentDetailContainer>
    </>
  );
}

export default GroupDetail;