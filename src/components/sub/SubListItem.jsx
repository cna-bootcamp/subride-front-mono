import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SubItem = styled.li`
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 5px 0px;
  margin: 10px 0px;

  .image-box {
    width: 60px;
    height: 60px;
    border-radius: 70%;
    background-color: white;
    margin-right: 10px;
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
        <img
          src={process.env.PUBLIC_URL + `/service/${item.serviceId}.png`}
          alt={item.serviceName}
        />
      </div>
      <div className="service">
        <p className="service-name">{item.serviceName}</p>
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
