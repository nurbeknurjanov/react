#!/bin/bash


PROTO_DIR=./src/api/proto

#generate client js code

#protoc -I=. src/proto/messages.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
#protoc -I=. ./src/proto/users.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.



#generate client js code

protoc -I=${PROTO_DIR} common_messages.proto \
    --js_out=import_style=commonjs:${PROTO_DIR}/generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DIR}/generated

protoc -I=${PROTO_DIR} common_services.proto \
    --js_out=import_style=commonjs:${PROTO_DIR}/generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DIR}/generated

protoc -I=${PROTO_DIR} users_messages.proto \
    --js_out=import_style=commonjs:${PROTO_DIR}/generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DIR}/generated

protoc -I=${PROTO_DIR} users_services.proto \
  --js_out=import_style=commonjs:${PROTO_DIR}/generated \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DIR}/generated


#/* eslint-disable */
