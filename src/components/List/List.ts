import { Row } from "../Row/Row";
import { TEXT } from "../../theme/theme";


export const ListItem = ({
  item,
  value,
  itemColor,
  valueColor,
}:{
  item: string
  value: string
  itemColor?: string
  valueColor?: string
}) => {

  return (
    <Row m={'2px 0'}>
        <TEXT.Body mr={'auto'} color={itemColor}>
          {item}
        </TEXT.Body>
        
        <TEXT.Body fontWeight={700} color={valueColor}>
          {value}
        </TEXT.Body>
    </Row>
  )
};
