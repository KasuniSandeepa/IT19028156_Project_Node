const PORT = process.env.PORT || 8087;
const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

