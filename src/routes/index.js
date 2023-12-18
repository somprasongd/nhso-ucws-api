const initRoutes = (app, soapClient) => {
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/ucws', async (req, res) => {
    const { user_pid, smctoken, pid } = req.query;
    if (!user_pid) {
      return res.status(400).json({
        error: 'user_pid is required',
      });
    }

    if (!smctoken) {
      return res.status(400).json({
        error: 'smctoken is required',
      });
    }

    if (!pid) {
      return res.status(400).json({
        error: 'pid is required',
      });
    }

    const args = {
      user_person_id: user_pid,
      smctoken: smctoken,
      person_id: pid,
    };
    soapClient.searchCurrentByPID(args, function (err, result) {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          error: err.message,
        });
      } else {
        // console.log(result);
        return res.json(result?.return || {});
      }
    });
  });

  // handle 404
  app.use((req, res, next) => {
    const error = new Error('Invalid route');
    error.status = 404;
    return next(error);
  });

  // handle error
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    // Log the exception
    if (status === 500 && app.get('env') === 'development') {
      console.log(error);
    }
    return res.status(status).json({
      error: {
        status,
        message: error.message,
      },
    });
  });
};

module.exports = {
  initRoutes,
};
