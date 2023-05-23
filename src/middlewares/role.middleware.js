export const isUser = (req, res, next) => {
  const role = req.session.role;
  console.log(req.session);
  if (role === "user") {
    next();
  } else {
    res.status(403).send("No tienes permiso para acceder a este recurso.");
  }
};

export const isAdmin = (req, res, next) => {
  const role = req.session.role;
  if (role === "admin") {
    next();
  } else {
    res.status(403).send("No tienes permiso para acceder a este recurso.");
  }
};

export const isPremium = (req, res, next) => {
  const role = req.session.role;
  if (role === "premium" || role === "admin") {
    next();
  } else {
    res.status(403).send("No tienes permiso para acceder a este recurso.");
  }
};

export const checkOwner = async (req, res, next) => {
  const userId = req.user.id; // Obtén el ID del usuario de la solicitud (asumiendo que estás utilizando un middleware de autenticación para establecer el usuario en el objeto de solicitud)

  try {
    const productId = req.params.id; // Obtén el ID del producto de los parámetros de la ruta o del cuerpo de la solicitud, dependiendo de cómo esté configurado tu enrutador

    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar si el usuario es un administrador
    if (req.user.role === "admin") {
      return next(); // Permiso concedido para el administrador
    }

    // Verificar si el usuario es propietario del producto
    if (product.owner === userId) {
      return next(); // Permiso concedido para el propietario del producto
    }

    // Si no se cumple ninguna de las condiciones anteriores, el usuario no tiene permiso
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al verificar los permisos del propietario" });
  }
};