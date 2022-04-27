import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const ContactCard = ({
    fname,
    lname,
    email,
    phone,
}) => (
    <Card sx={{ width: '90%', margin: '20px auto' }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {lname}, {fname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {email}
            </Typography>
        </CardContent>
        <CardActions>
            <Link href={`tel:${phone}`} underline={'hover'} variant={'button'}>Call</Link>
            <Link href={`mailto:${email}`} target={'_blank'} underline={'hover'} variant={'button'}>Email</Link>
        </CardActions>
    </Card>
);

export default ContactCard;
