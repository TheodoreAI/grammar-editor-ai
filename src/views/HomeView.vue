<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <div class="app">
    <!-- content -->
    <div class="container">
      <div class="card">
        <div class="card-header text-center">
          <p class="lead">Please turn on the AI before you start typing.</p>
          <button
            class="btn btn-success"
            @click.prevent="callAPIUsingFetch(messages)"
          >
            ON
          </button>
        </div>
        <div class="card-body">
          <!-- loading -->
          <div v-if="loading" class="d-flex justify-content-center m-3">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
          <div v-else>
            <p class="lead">Grammar Editor Assistant</p>
            <p class="fw-bold">{{ content }}</p>
          </div>
        </div>
        <!-- characters remaining -->
        <div class="form-floating m-3">
          <textarea
            class="form-control"
            id="userInput"
            maxlength="200"
            type="text"
            v-model="newMessage"
          />
          <label for="userInput">Fix the following</label>
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
      loading: false,
      maxCharacterLength: 200,
    };
  },
  computed: {
    charactersRemaining() {
      return this.maxCharacterLength - this.newMessage.length;
    },
  },
  methods: {
    // The following function is called when the user clicks the button
    // it will call the API using the Fetch API
    // which will return a response in JSON format
    callAPIUsingFetch(messages) {
      this.loading = true; // Set loading boolean to true before making the API call

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
          this.loading = false; // Set loading boolean to false after receiving the response
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading = false; // Set loading boolean to false if an error occurs
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
