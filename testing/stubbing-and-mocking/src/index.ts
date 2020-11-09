import { sendMessage } from './sqs';
import { Context } from 'aws-lambda';

export const handler = async (event: any, context?: Context) => {

    try {
        const queueUrl = process.env.SQS_QUEUE_URL || "https://sqs.eu-west-2.amazonaws.com/0123456789012/test-stub-example";
        const sendMessageResult = await sendMessage(JSON.stringify({foo: "bar"}), queueUrl);
        return `Sent message with ID: ${sendMessageResult.MessageId}`;
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}