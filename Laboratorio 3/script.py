# Definir una función para modificar el diccionario
def modificar_diccionario(diccionario_file):
    # Lista para almacenar las contraseñas modificadas
    contraseñas_modificadas = []

    # Abrir el archivo de diccionario original en modo lectura con el codec 'latin-1'
    with open(diccionario_file, 'r', encoding='latin-1') as archivo:
        # Leer líneas del archivo
        lineas = archivo.readlines()

        # Recorrer cada línea del archivo
        for linea in lineas:
            # Eliminar espacios en blanco al principio y al final de la línea
            linea = linea.strip()

            # Verificar si la línea no está vacía y si no comienza con un número
            if linea and not linea[0].isdigit():
                # Modificar la primera letra a mayúscula y agregar un '0' al final
                contraseña_modificada = linea[0].upper() + linea[1:] + '0'

                # Agregar la contraseña modificada a la lista
                contraseñas_modificadas.append(contraseña_modificada)

    # Guardar las contraseñas modificadas en un nuevo archivo
    with open('rockyou_mod.dic', 'w') as archivo_modificado:
        for contraseña in contraseñas_modificadas:
            archivo_modificado.write(contraseña + '\n')

    # Devolver la cantidad de contraseñas en el archivo modificado
    return len(contraseñas_modificadas)

# Nombre del archivo de diccionario original
diccionario_original = 'rockyou.txt'

# Llamar a la función para modificar el diccionario
cantidad_contraseñas_modificadas = modificar_diccionario(diccionario_original)

# Imprimir la cantidad de contraseñas en el archivo modificado
print(f'Se han modificado y guardado {cantidad_contraseñas_modificadas} contraseñas en el archivo rockyou_mod.dic.')
