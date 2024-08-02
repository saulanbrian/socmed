import { 
  Collapse,
  CardContent,
} from '@mui/material'


export default function CommentCollapse({isIn}){
  return (
    <Collapse in={isIn} timeout={{
      enter:800,
      exit:1300
    }}>
      <CardContent>
        <p>additional content</p>
      </CardContent>
    </Collapse>
    )
}