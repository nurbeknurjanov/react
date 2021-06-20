import styled, {css} from "styled-components";

export const buttonCss = css`
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 10px 20px;
    display:inline-block;
    text-decoration:none;
  ${props => props.primary && css`
      background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
      box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
      &:hover{
         background: linear-gradient(225deg, #2196F3 30%, #21CBF3 90%);
      }
  `}
  ${props => props.secondary && css`
      background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
      box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
      &:hover{
         background: linear-gradient(225deg, #FE6B8B 30%, #FE6B8B 90%);
      }
  `}
`
// color: ${({color}) => color};

export const ButtonLink = styled.a`
  ${buttonCss}
`;
export const Button = styled.button`
  ${buttonCss}
`;
