import styled from "@emotion/styled";
const color = {
  생필품: {
    button: "#FFB864",
    card: "#ffdbb0",
  },
  반려동물: {
    button: "#88B8FF",
    card: "#eff3fe",
  },
};
const StyledItem = styled.li`
  margin: 2px 0px;

  button {
    border: none;
    box-shadow: none;
    border-radius: 9px;
    overflow: visible;
    cursor: pointer;
  }

  .category-button {
    background-color: ${(props) =>
      props.isSelected ? color[props.name].button : "#eeeeee"};
  }

  .category-name {
    padding: 8px 14px;
    font-size: 13px;
    font-family: "KBFGDisplayL";
    color: ${(props) => (props.isSelected ? "white" : "#767676")};
  }
`;

function CategoryItem({ name, selectItem, isSelected }) {
  console.log(name, isSelected);
  console.log(isSelected ? color[name].button : "#eeeeee");
  return (
    <StyledItem isSelected={isSelected} name={name}>
      <button className="category-button" onClick={() => selectItem(name)}>
        <p className="category-name">{name}</p>
      </button>
    </StyledItem>
  );
}

export default CategoryItem;
