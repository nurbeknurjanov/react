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

var common_messages_pb = require('./common_messages_pb.js')

var users_messages_pb = require('./users_messages_pb.js')
const proto = {};
proto.tutorial = require('./common_services_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tutorial.CommonClient =
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
proto.tutorial.CommonPromiseClient =
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
 *   !proto.tutorial.LoginPost,
 *   !proto.tutorial.TokenResponse>}
 */
const methodDescriptor_Common_Login = new grpc.web.MethodDescriptor(
  '/tutorial.Common/Login',
  grpc.web.MethodType.UNARY,
  common_messages_pb.LoginPost,
  common_messages_pb.TokenResponse,
  /**
   * @param {!proto.tutorial.LoginPost} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_messages_pb.TokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tutorial.LoginPost,
 *   !proto.tutorial.TokenResponse>}
 */
const methodInfo_Common_Login = new grpc.web.AbstractClientBase.MethodInfo(
  common_messages_pb.TokenResponse,
  /**
   * @param {!proto.tutorial.LoginPost} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_messages_pb.TokenResponse.deserializeBinary
);


/**
 * @param {!proto.tutorial.LoginPost} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.TokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.TokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.CommonClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Common/Login',
      request,
      metadata || {},
      methodDescriptor_Common_Login,
      callback);
};


/**
 * @param {!proto.tutorial.LoginPost} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.TokenResponse>}
 *     Promise that resolves to the response
 */
proto.tutorial.CommonPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Common/Login',
      request,
      metadata || {},
      methodDescriptor_Common_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.tutorial.User>}
 */
const methodDescriptor_Common_Auth = new grpc.web.MethodDescriptor(
  '/tutorial.Common/Auth',
  grpc.web.MethodType.UNARY,
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
const methodInfo_Common_Auth = new grpc.web.AbstractClientBase.MethodInfo(
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
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.CommonClient.prototype.auth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Common/Auth',
      request,
      metadata || {},
      methodDescriptor_Common_Auth,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.User>}
 *     Promise that resolves to the response
 */
proto.tutorial.CommonPromiseClient.prototype.auth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Common/Auth',
      request,
      metadata || {},
      methodDescriptor_Common_Auth);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.tutorial.TokenResponse>}
 */
const methodDescriptor_Common_GetAccessToken = new grpc.web.MethodDescriptor(
  '/tutorial.Common/GetAccessToken',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  common_messages_pb.TokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_messages_pb.TokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.tutorial.TokenResponse>}
 */
const methodInfo_Common_GetAccessToken = new grpc.web.AbstractClientBase.MethodInfo(
  common_messages_pb.TokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_messages_pb.TokenResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tutorial.TokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tutorial.TokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tutorial.CommonClient.prototype.getAccessToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tutorial.Common/GetAccessToken',
      request,
      metadata || {},
      methodDescriptor_Common_GetAccessToken,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tutorial.TokenResponse>}
 *     Promise that resolves to the response
 */
proto.tutorial.CommonPromiseClient.prototype.getAccessToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tutorial.Common/GetAccessToken',
      request,
      metadata || {},
      methodDescriptor_Common_GetAccessToken);
};


module.exports = proto.tutorial;

