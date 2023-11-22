# Usa la imagen base de Ubuntu 16.10
FROM ubuntu:16.10

COPY sources.list /etc/apt/sources.list


# Actualiza el sistema e instala el cliente y servidor OpenSSH
RUN apt-get update && apt-get install -y \
    openssh-client \
    openssh-server

# Configura el servidor SSH
RUN mkdir /var/run/sshd

# Permitir la autenticación de contraseña en SSH
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Exponer el puerto 22 para conexiones SSH
EXPOSE 22

# Configura el contenedor para comportarse como un servidor SSH
CMD ["/usr/sbin/sshd", "-D"]
