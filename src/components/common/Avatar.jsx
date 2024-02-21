import styled, { css } from "styled-components";
import defaultUser from "assets/user.svg";

export default function Avatar({ src, size, ...props }) {
  if (src === "null") src = defaultUser;
  return (
    <AvatarFigure size={size}>
      <img src={src ?? defaultUser} alt="아바타이미지" {...props} />
    </AvatarFigure>
  );
}

const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case "large":
        return css`
          width: 75px;
          height: 75px;
        `;
      case "profile":
        return css`
          width: 150px;
          height: 150px;
          margin: 10px auto 10px auto;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}

  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
