<template>
  <div class="message">
    <h1> {{toUser.name}} </h1>
    <div class="msg-list">
      <div v-for="(msg,index) in messageList"
           :key="index">
        <div :class="classComputed(msg.from)">
          <a-button type="primary">
            {{msg.msg}}
          </a-button>
        </div>
      </div>
    </div>
    <a-row>
      <a-col :span=12>
        <a-input class="input"
                 v-model="msg"></a-input>
      </a-col>
      <a-col :span=6>
        <p>from:{{myInfo.name}}</p>
      </a-col>
      <a-col :span=6>
        <a-button type="primary"
                  @click="sendMsg">发送</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    toUser: {
      type: Object,
      default: () => ({})
    },
    myInfo: {
      type: Object,
      default: () => ({})
    },
    messages: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    messageList () {
      console.log(this.messages)
      return this.messages.filter(r => (r.from == this.myInfo._id && r.to == this.toUser._id) || r.to == this.myInfo._id && r.from == this.toUser._id)
    },
    classComputed () {
      return id => id == this.myInfo._id ? 'right' : 'left'
    }
  },
  data () {
    return {
      msg: '',
    }
  },
  created () {

  },
  methods: {
    sendMsg () {
      this.$emit('send', this.toUser._id, this.msg)
    },
  },
}
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.msg-list {
  flex: 1;
  overflow: scroll;
}
.input {
  margin-bottom: 10px;
}
.left {
  margin: 10px;
  display: flex;
  justify-content: flex-start;
}
.right {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
