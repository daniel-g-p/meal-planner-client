<template>
  <app-modal :title="title" @close="goBack">
    <form class="form" @submit.prevent="submit" novalidate>
      <div class="form__field--full">
        <app-textbox
          field-id="ingredientName"
          label="Ingredient Name"
          v-model="form.name"
        ></app-textbox>
      </div>
      <div class="form__field--full">
        <app-radio-field
          :fields="unitOptions"
          fieldId="measuringUnit"
          label="Measuring unit"
          v-model="form.unit"
        ></app-radio-field>
      </div>
      <div class="form__field--large">
        <app-textbox
          type="number"
          field-id="carbohydrates"
          label="Carbohydrates (g)"
          placeholder="0"
          v-model="form.carbohydrates"
        ></app-textbox>
      </div>
      <div class="form__field--small">
        <app-textbox
          type="number"
          field-id="sugars"
          label="Sugars (g)"
          placeholder="0"
          v-model="form.sugars"
        ></app-textbox>
      </div>
      <div class="form__field--large">
        <app-textbox
          type="number"
          field-id="fats"
          label="Fats (g)"
          placeholder="0"
          v-model="form.fats"
        ></app-textbox>
      </div>
      <div class="form__field--small">
        <app-textbox
          type="number"
          field-id="saturatedFats"
          label="Saturated Fats (g)"
          placeholder="0"
          v-model="form.saturatedFats"
        ></app-textbox>
      </div>
      <div class="form__field--full">
        <app-textbox
          type="number"
          field-id="protein"
          label="Protein (g)"
          placeholder="0"
          v-model="form.protein"
        ></app-textbox>
      </div>
    </form>
    <div class="form__buttons form__field--full">
      <app-button @click="submit">Confirm</app-button>
      <app-button v-if="ingredientId" color="red" @click="deleteIngredient"
        >Delete</app-button
      >
    </div>
  </app-modal>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import apiCall from "../../mixins/api-call.js";

export default {
  props: {
    ingredientId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const title = computed(() => {
      return props.ingredientId ? "Edit Ingredient" : "New Ingredient";
    });
    const store = useStore();
    const ingredient = computed(() => {
      if (props.ingredientId) {
        const ingredientList = store.getters["ingredients/getAll"];
        return ingredientList.find((item) => item._id === props.ingredientId);
      }
    });
    const form = reactive({
      name: "",
      unit: "100g",
      carbohydrates: 0,
      fats: 0,
      protein: 0,
      sugars: 0,
      saturatedFats: 0,
    });
    const unitOptions = [
      { id: "100g", label: "100g" },
      { id: "100ml", label: "100ml" },
      { id: "unit", label: "unit" },
      { id: "tsp", label: "tsp" },
      { id: "tbsp", label: "tbsp" },
    ];
    const submit = async () => {
      try {
        const id = props.ingredientId;
        const response = await apiCall(
          id ? `ingredients/${id}` : "ingredients",
          id ? "PUT" : "POST",
          false,
          { ingredient: form }
        );
        if (response.ok) {
          store.dispatch("ingredients/fetchAll");
          store.dispatch("meals/fetchAll");
          goBack();
        } else {
          alert(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const deleteIngredient = async () => {
      const response = await apiCall(
        `ingredients/${props.ingredientId}`,
        "DELETE"
      );
      if (response.ok) {
        goBack();
      } else {
        alert(response.error);
      }
    };
    const router = useRouter();
    const goBack = () => {
      store.dispatch("ingredients/fetchAll");
      store.dispatch("meals/fetchAll");
      router.push({ name: "ingredients" });
    };
    onMounted(() => {
      if (ingredient.value) {
        const fields = Object.keys(form);
        for (let field of fields) {
          form[field] = ingredient.value[field];
        }
      } else if (props.ingredientId) {
        goBack();
      }
    });
    return { form, unitOptions, title, submit, deleteIngredient, goBack };
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
