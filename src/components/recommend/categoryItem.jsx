import styled from "@emotion/styled";
const color = {
  생필품: {
    button: "#88B8FF",
    card: "#ffdbb0",
  },
  반려동물: {
    button: "#FFB864",
    card: "#eff3fe",
  },
};
const StyledItem = styled.li`
  flex: 1 1 20%;

  button {
    border: none;
    box-shadow: none;
    border-radius: 9px;
    overflow: visible;
    cursor: pointer;
    width: 95%;
    min-height: 30px;
    white-space: nowrap;
    background-color: ${(props) =>
      props.isSelected ? color[props.name].button : "#eeeeee"};
  }

  .category-name {
    font-size: 13px;
    font-family: "KBFGDisplayL";
    color: ${(props) => (props.isSelected ? "white" : "#767676")};
  }
`;

function CategoryItem({ name, selectItem, isSelected }) {
  return (
    <StyledItem isSelected={isSelected} name={name}>
      <button className="category-button" onClick={() => selectItem(name)}>
        <p className="category-name">{name}</p>
      </button>
    </StyledItem>
  );
}

export default CategoryItem;
