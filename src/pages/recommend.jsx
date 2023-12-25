import styled from "@emotion/styled";
import CategoryItem from "../components/recommend/categoryItem";
import { useState } from "react";
import Navigation from "../common/navigation";

const RecommendPage = styled.div`
  color: #4a4646;

  p {
    margin: 0;
  }

  span {
    font-family: "KBFGDisplayB";
  }

  .title {
    font-size: 16px;
    margin-top: 1rem;
    color: #4a483f;
  }

  .sub-title {
    font-size: 12px;
    color: #767676;
    margin: 0.5rem 0rem;
    white-space: nowrap;
  }

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px 0px;
  }

  img {
    width: 100%;
  }
`;

const category = [
  "음료",
  "식품",
  "생필품",
  "건강",
  "뷰티",
  "반려동물",
  "패션잡화",
  "인테리어",
  "취미",
];

function Recommend({ user }) {
  const [selectedItem, setSelectedItem] = useState("생필품");

  const selectItem = (itemName) => {
    if (itemName !== "생필품" && itemName !== "반려동물") return;
    setSelectedItem(itemName);
  };

  return (
    <>
      <RecommendPage>
        <p className="title">
          {user.userName}님을 위한{" "}
          <span style={{ fontSize: "20px", color: "#F8A809" }}>
            구독서비스 추천
          </span>
        </p>
        <p className="sub-title">이번 달 생필품에 81,000원을 지출했어요</p>
        <ul className="category">
          {category.map((item, index) => (
            <CategoryItem
              key={index}
              name={item}
              selectItem={selectItem}
              isSelected={selectedItem === item}
            ></CategoryItem>
          ))}
        </ul>
        <img
          src={process.env.PUBLIC_URL + `/${selectedItem}.png`}
          alt={selectedItem + " king"}
        />
      </RecommendPage>
      <Navigation />
    </>
  );
}

export default Recommend;
