import dva from 'dva';
import './index.css';
import  createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  })
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/login').default);
app.model(require('./models/signIn').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
