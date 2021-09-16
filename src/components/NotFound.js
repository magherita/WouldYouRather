import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

const NotFound = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Card className={classes.root}>
            <CardHeader
                title="404: Not found"
                avatar={
                    <Avatar
                        alt="404 avatar"
                        src="/images/404.jpg"
                    />
                }
            />
            <CardContent>
                <Typography variant="subtitle1">
                    The resource at {location.pathname} was not found!
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NotFound;