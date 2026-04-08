#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SOCKET_PATH "/tmp/node_c_socket"

void printHex(const char *data, size_t length) {
    for (size_t i = 0; i < length; i++) {
        printf("%02X ", (unsigned char)data[i]);
    }
    printf("\n");
}

int main() {
    int serverSocket = socket(AF_UNIX, SOCK_STREAM, 0);

    if (serverSocket == -1) {
        fprintf(stderr, "Socket creation failed");
        exit(1);
    }

    struct sockaddr_un serverAddr;
    serverAddr.sun_family = AF_UNIX;
    strcpy(serverAddr.sun_path, SOCKET_PATH);

    unlink(SOCKET_PATH);

    if (bind(serverSocket, (struct sockaddr *)&serverAddr, sizeof(serverAddr)) == -1) {
        fprintf(stderr, "Socket binding failed");
        close(serverSocket);
        exit(1);
    }

    if (listen(serverSocket, 5) == -1) {
        fprintf(stderr, "Socket listening failed");
        close(serverSocket);
        exit(1);
    }

    printf("Server is listening...\n");

    while (1) {
        int clientSocket = accept(serverSocket, NULL, NULL);


        if (clientSocket == -1) {
            fprintf(stderr, "Socket accepting failed");
            close(serverSocket);
            exit(1);
        }

        char buffer[100];
        ssize_t bytesRead = read(clientSocket, buffer, sizeof(buffer));

        if (bytesRead > 0) {
            printHex(buffer, bytesRead);
            fflush(stdout);
        }

    }

    close(serverSocket);

    exit(0);
}
