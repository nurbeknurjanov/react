/**
 * @fileoverview gRPC-Web generated client stub for tutorial
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var users_messages_pb = require('./users_messages_pb.js')
const proto = {};
proto.tutorial = require('./users_services_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tutorial.UsersClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tutorial.UsersPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tutorial.UserRequest,
 *   !proto.tutorial.User>}
 */
const methodDescriptor_Users_GetUser = new grpc.web.MethodDescriptor(
  '/tutorial.Users/GetUser',
  grpc.web.MethodType.UNARY,
  users_messages_pb.UserRequest,
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.UserRequest,
 *   !proto.tutorial.User>}
 */
const methodInfo_Users_GetUser = new grpc.web.AbstractClientBase.MethodInfo(
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @param {!proto.tutorial.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Users/GetUser',
      request,
      metadata || {},
      methodDescriptor_Users_GetUser,
      callback);
};


/**
 * @param {!proto.tutorial.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.User>}
 *     Promise that resolves to the response
 */
proto.tutorial.UsersPromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Users/GetUser',
      request,
      metadata || {},
      methodDescriptor_Users_GetUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tutorial.UserPost,
 *   !proto.tutorial.User>}
 */
const methodDescriptor_Users_CreateUser = new grpc.web.MethodDescriptor(
  '/tutorial.Users/CreateUser',
  grpc.web.MethodType.UNARY,
  users_messages_pb.UserPost,
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserPost} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.UserPost,
 *   !proto.tutorial.User>}
 */
const methodInfo_Users_CreateUser = new grpc.web.AbstractClientBase.MethodInfo(
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserPost} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @param {!proto.tutorial.UserPost} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Users/CreateUser',
      request,
      metadata || {},
      methodDescriptor_Users_CreateUser,
      callback);
};


/**
 * @param {!proto.tutorial.UserPost} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.User>}
 *     Promise that resolves to the response
 */
proto.tutorial.UsersPromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Users/CreateUser',
      request,
      metadata || {},
      methodDescriptor_Users_CreateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tutorial.UserPostUpdate,
 *   !proto.tutorial.User>}
 */
const methodDescriptor_Users_UpdateUser = new grpc.web.MethodDescriptor(
  '/tutorial.Users/UpdateUser',
  grpc.web.MethodType.UNARY,
  users_messages_pb.UserPostUpdate,
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserPostUpdate} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.UserPostUpdate,
 *   !proto.tutorial.User>}
 */
const methodInfo_Users_UpdateUser = new grpc.web.AbstractClientBase.MethodInfo(
  users_messages_pb.User,
  /**
   * @param {!proto.tutorial.UserPostUpdate} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @param {!proto.tutorial.UserPostUpdate} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.updateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Users/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_Users_UpdateUser,
      callback);
};


/**
 * @param {!proto.tutorial.UserPostUpdate} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.User>}
 *     Promise that resolves to the response
 */
proto.tutorial.UsersPromiseClient.prototype.updateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Users/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_Users_UpdateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tutorial.UserRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Users_DeleteUser = new grpc.web.MethodDescriptor(
  '/tutorial.Users/DeleteUser',
  grpc.web.MethodType.UNARY,
  users_messages_pb.UserRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.tutorial.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.UserRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Users_DeleteUser = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.tutorial.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.tutorial.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Users/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_Users_DeleteUser,
      callback);
};


/**
 * @param {!proto.tutorial.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.tutorial.UsersPromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Users/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_Users_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.tutorial.User>}
 */
const methodDescriptor_Users_GetUsersStream = new grpc.web.MethodDescriptor(
  '/tutorial.Users/GetUsersStream',
  grpc.web.MethodType.SERVER_STREAMING,
  google_protobuf_empty_pb.Empty,
  users_messages_pb.User,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.tutorial.User>}
 */
const methodInfo_Users_GetUsersStream = new grpc.web.AbstractClientBase.MethodInfo(
  users_messages_pb.User,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.User.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.getUsersStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/tutorial.Users/GetUsersStream',
      request,
      metadata || {},
      methodDescriptor_Users_GetUsersStream);
};


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersPromiseClient.prototype.getUsersStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/tutorial.Users/GetUsersStream',
      request,
      metadata || {},
      methodDescriptor_Users_GetUsersStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tutorial.UsersRequest,
 *   !proto.tutorial.UsersResponse>}
 */
const methodDescriptor_Users_GetUsers = new grpc.web.MethodDescriptor(
  '/tutorial.Users/GetUsers',
  grpc.web.MethodType.UNARY,
  users_messages_pb.UsersRequest,
  users_messages_pb.UsersResponse,
  /**
   * @param {!proto.tutorial.UsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.UsersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.UsersRequest,
 *   !proto.tutorial.UsersResponse>}
 */
const methodInfo_Users_GetUsers = new grpc.web.AbstractClientBase.MethodInfo(
  users_messages_pb.UsersResponse,
  /**
   * @param {!proto.tutorial.UsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  users_messages_pb.UsersResponse.deserializeBinary
);


/**
 * @param {!proto.tutorial.UsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.UsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.UsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.UsersClient.prototype.getUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Users/GetUsers',
      request,
      metadata || {},
      methodDescriptor_Users_GetUsers,
      callback);
};


/**
 * @param {!proto.tutorial.UsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.UsersResponse>}
 *     Promise that resolves to the response
 */
proto.tutorial.UsersPromiseClient.prototype.getUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Users/GetUsers',
      request,
      metadata || {},
      methodDescriptor_Users_GetUsers);
};


module.exports = proto.tutorial;

