import AWS = require("aws-sdk");
import { AWSError } from "aws-sdk";
import { SendMessageRequest, SendMessageResult } from "aws-sdk/clients/sqs";
import { PromiseResult } from "aws-sdk/lib/request";

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

export function sendMessage(messageBody: string, queueUrl: string) : Promise<PromiseResult<SendMessageResult, AWSError>> {

  var params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  } as SendMessageRequest;

  return sqs
    .sendMessage(params)
    .promise()
    .then(res => res)
    .catch((err) => { throw err; });
}