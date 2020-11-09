import * as chai from 'chai';
import * as sinon from "sinon";
import { assert } from "sinon";

import * as sqs from '../src/sqs';
import { handler } from '../src/index';
import sinonChai from "sinon-chai";
import { PromiseResult } from 'aws-sdk/lib/request';
import { SendMessageResult } from 'aws-sdk/clients/SQS';
import { Response } from 'aws-sdk';
import { AWSError } from 'aws-sdk';

const expect = chai.expect;

chai.use(sinonChai);

const event = {
    test: "test"
};

describe("lambda-example-sqs-handler", () => {
  describe("handler", () => {

    const sendMessageStub = sinon.stub(sqs, "sendMessage");

    let stubResponse : PromiseResult<SendMessageResult, AWSError> = {
        $response: new Response<SendMessageResult, AWSError>(),
        MD5OfMessageBody: '828bcef8763c1bc616e25a06be4b90ff',
        MessageId: '123',
    };

    sendMessageStub.resolves(stubResponse);

    it("should send an sqs message and return the message ID", async () => {

      // WHEN

      process.env.SQS_QUEUE_URL = "https://sqs.eu-west-1.amazonaws.com/123456789012/test-queue";
      const result = await handler(event);
      
      // THEN

      expect(result).to.exist;
      expect(result).to.eql(`Sent message with ID: 123`);
      assert.calledOnce(sendMessageStub);
    });
  });
});