import styled from "@emotion/styled";
import netflix from "../../assets/netflix.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SubItem = styled.li`
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0px;

  .image-box {
    width: 60px;
    height: 60px;
    border-radius: 70%;
    background-color: white;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .service {
    width: 70%;
  }

  p {
    font-size: 12px;
    margin-left: 1px;
  }

  p.service-name {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
`;

function SubListItem({ item, handleClick }) {
  return (
    <SubItem>
      <div className="image-box">
        <img src={netflix} alt="logo" />
      </div>
      <div className="service">
        <p className="service-name">
          {item.serviceName} {item.serviceName} {item.serviceName}
        </p>
        <p>썹타러 가기</p>
      </div>
      <ArrowForwardIosIcon
        onClick={handleClick}
        sx={{ fontSize: "16px", marginLeft: "auto" }}
      />
    </SubItem>
  );
}

export default SubListItem;
