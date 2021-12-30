<template>
  <a-layout class="container">
    <a-layout-sider class="sider" breakpoint="lg" collapsed-width="0">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" class="menu" @select="select">
        <a-menu-item v-for="user in users" :key="user._id">
          <a-icon type="user" />
          <span class="nav-text">{{
            user.name + (user.id ? "" : "离线")
          }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content">
          <chat
            v-if="selectUser"
            :toUser="selectUser"
            :myInfo="myInfo"
            :messages="messages"
            @send="sendMsg"
          ></chat>
          <div v-else>点击名字聊天</div>
        </div>
      </a-layout-content>
      <a-layout-footer style="textalign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import chat from "./chat-single.vue";
import io from "socket.io-client";
import { user } from "@/api";
export default {
  components: { chat },
  data() {
    return {
      users: [],
      selectUser: "",
      myInfo: "",
      messages: [],
      sockets: "",
      connected: false,
    };
  },
  created() {
    console.log(user);
    this.mineId = this.$route.query.id;
    user.login(this.mineId).then((r) => {
      this.myInfo = r.data;
      this.init(r);
    });
  },
  socket: {
    connect: (msg) => {
      console.log("msg", msg);
    },
  },
  methods: {
    init() {
      this.sockets = io("ws://127.0.0.1:7001?id=" + this.mineId);
      this.sockets.on("userChange", (data) => {
        this.updateUser(JSON.parse(data));
      });
      this.sockets.on("connect", (data) => {
        if (data) {
          this.connected = true;
        }
      });
      this.sockets.on("chat", (data) => {
        console.log("message", data);
        this.messages.push(JSON.parse(data));
      });
      user.list().then((r) => {
        this.updateUser(r.data);
      });
    },
    select(v) {
      this.selectUser = this.users.find((r) => r._id == v.key);
    },
    getId() {
      return decodeURIComponent();
    },
    sendMsg(to, msg) {
      console.log("send", to, msg);
      this.messages.push({ from: this.myInfo._id, to: to, msg: msg });
      this.sockets &&
        this.sockets.emit(
          "chat",
          JSON.stringify({ from: this.myInfo._id, to: to, msg: msg })
        );
    },
    updateUser(data) {
      this.myInfo = data.find((r) => r._id == this.mineId);
      this.users = data.filter((r) => r._id != this.mineId);
      if (!this.myInfo) {
        this.$notification.error({
          message: "失败",
          description: "无此用户",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100% !important;
}
.container .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.content {
  padding: 24px;
  background: #fff;
  height: 100%;
}
</style>
