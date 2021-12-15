<template>
  <app-modal :title="title" @close="goBack">
    <form class="form" @submit.prevent="submit" novalidate>
      <div class="form__field--full">
        <app-textbox
          field-id="mealName"
          label="Meal Name"
          v-model="mealName"
        ></app-textbox>
      </div>
    </form>
    <div class="form__buttons form__field--full">
      <app-button @click="submit">Confirm</app-button>
      <app-button v-if="mealId" color="red" @click="deleteMeal"
        >Delete</app-button
      >
    </div>
  </app-modal>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import apiCall from "../../mixins/api-call.js";

export default {
  props: {
    mealId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const form = "";
    const mealName = ref("");
    const store = useStore();
    const meal = computed(() => {
      if (props.mealId) {
        const mealList = store.getters["meals/getAll"];
        return mealList.find((item) => item._id === props.mealId);
      }
    });
    const title = computed(() => {
      return props.mealId ? "Edit Meal" : "New Meal";
    });
    const submit = async () => {
      try {
        const id = props.mealId;
        const response = await apiCall(
          id ? `meals/${id}` : "meals",
          id ? "PUT" : "POST",
          false,
          { meal: form }
        );
        if (response.ok) {
          store.dispatch("meals/fetchAll");
          goBack();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const deleteMeal = async () => {
      const response = await apiCall(`meals/${props.mealId}`, "DELETE");
      if (response.ok) {
        store.dispatch("meals/fetchAll");
        goBack();
      }
    };
    const router = useRouter();
    const goBack = () => {
      router.push({ name: "meals" });
    };
    onMounted(() => {
      if (meal.value) {
        const fields = Object.keys(form);
        for (let field of fields) {
          form[field] = meal.value[field];
        }
      } else if (props.mealId) {
        goBack();
      }
    });
    return { mealName, title, submit, deleteMeal, goBack };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.form {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  &__field {
    &--full {
      grid-column: 1 / -1;
    }
    &--large {
      grid-column: 1 / 4;
    }
    &--small {
      grid-column: 4 / -1;
    }
  }
  &__buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
</style>
