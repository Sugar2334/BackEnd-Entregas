export const isUser = (req, res, next) => {
    const role = req.session.role;
    console.log(req.session)
    if (role === "user") {
      next();
    } else {
      res.status(403).send("No tienes permiso para acceder a este recurso.");
    }
  };
  
  export const isAdmin = (req, res, next) => {
    console.log(req);
      const role = req.session.role;
      if (role === "admin") {
        next();
      } else {
        res.status(403).send("No tienes permiso para acceder a este recurso.");
      }
    };