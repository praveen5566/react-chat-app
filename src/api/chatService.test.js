import { getRoomList, getRoomDetail, getMessagesByRoomId } from "./chatService";

global.fetchData = jest.fn();

const MOCK_DATA_ROOM_LIST = [
  { id: 0, name: "Chat Room 1" },
  { id: 1, name: "Chat Room 2" }
];
const MOCK_DATA_ROOM_DETAIL = {
  id: 1,
  name: "Chat Room 2",
  users: ["Jessye"]
};
const MOCK_MESSAGES_BY_ROOMID = [
  { id: "ff35278", message: "Good Morning", name: "Jessye", reaction: null }
];

it("should test getRoomList", async () => {
  const data = await getRoomList();
  expect(data).toEqual(MOCK_DATA_ROOM_LIST);
});

it("should test getRoomDetail", async () => {
  const data = await getRoomDetail(1);
  expect(data).toEqual(MOCK_DATA_ROOM_DETAIL);
});

it("should test getMessagesByRoomId", async () => {
  const data = await getMessagesByRoomId(1);
  expect(data).toEqual(MOCK_MESSAGES_BY_ROOMID);
});
