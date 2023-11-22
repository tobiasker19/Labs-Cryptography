# Usa la imagen base de Ubuntu 20.10
FROM ubuntu:20.10

COPY sources.list /etc/apt/sources.list

# Actualiza el sistema e instala el cliente y servidor OpenSSH
RUN apt-get update && apt-get install -y \
    tshark \
    openssh-client \
    openssh-server \
    whois

# Configura el servidor SSH
RUN mkdir /var/run/sshd

# Crea el usuario 'test' con la contraseña 'test'
RUN useradd -m test && \
    echo "test:test" | chpasswd

# Permitir la autenticación de contraseña en SSH
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Exponer el puerto 22 para conexiones SSH
EXPOSE 22

# Configura el contenedor para comportarse como un servidor SSH
CMD ["/usr/sbin/sshd", "-D"]
