import { messageIdToAnchorId } from './messageIdToAnchorId';

test('message-id@example to equal message-id', () => {
  expect(messageIdToAnchorId('message-id@example')).toBe('message-id');
});
