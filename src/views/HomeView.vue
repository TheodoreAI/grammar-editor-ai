<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <div class="app">
    <!-- loading -->
    <div class="loading">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <!-- content -->
    <div class="card">
      <div class="card-body row text-center">
        <button
          class="btn btn-secondary"
          @click.prevent="callAPIUsingFetch(messages)"
        >
          Call API
        </button>
        <p class="fw-bold">Grammar Editor Assistant: {{ content }}</p>
        <!-- characters remaining -->
        <textarea
          class="form-input p-3 m-2"
          maxlength="100"
          type="text"
          placeholder="Queries could be 'Please correct the following sentence: i assisted with the grammar editing,'"
          v-model="newMessage"
        />
      </div>
      <button class="btn btn-primary p-3" @click.prevent="sendNewMessage()">
        Send
      </button>
    </div>
    <div class="card-footer">
      <label class="lead"
        >Characters remaining: {{ charactersRemaining }}</label
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import trainingData from "@/assets/training-data.json";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      model: "gpt-3.5-turbo",
      messages: trainingData,
      content: "",
      newMessage: "",
      loading: true,
    };
  },
  computed: {
    charactersRemaining() {
      return 100 - this.newMessage.length;
    },
  },
  methods: {
    // The following function is called when the user clicks the button
    // it will call the API using the Fetch API
    // which will return a response in JSON format
    callAPIUsingFetch(messages) {
      fetch("https://my-ai-server.herokuapp.com/calling-grammar-editor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.content = data.response;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // Sends a newMessage to the API that comes from the user input with v-model
    // make sure it is still the same thread of conversation with the assistant
    // and then call the API again to get the response
    sendNewMessage() {
      const newContent = [{ role: "user", content: this.newMessage }];
      this.newMessage = "";
      this.callAPIUsingFetch(newContent);
    },
  },

  created() {
    console.log("HomeView created");
    // this.callAPIUsingFetch(this.messages);
  },
};
</script>
