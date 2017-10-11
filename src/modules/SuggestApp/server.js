import proxy from '../../../services/proxy';

const app = proxy(8000);

app.start();
