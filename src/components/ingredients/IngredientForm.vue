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
          v-model="form.measuringUnit"
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
          field-id="fats"
          label="Fats (g)"
          placeholder="0"
          v-model="form.fats"
        ></app-textbox>
      </div>
      <div class="form__field--large">
        <app-textbox
          type="number"
          field-id="protein"
          label="Protein (g)"
          placeholder="0"
          v-model="form.protein"
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
      <div class="form__field--full">
        <app-textbox
          type="number"
          field-id="saturatedFats"
          label="Saturated Fats (g)"
          placeholder="0"
          v-model="form.saturatedFats"
        ></app-textbox>
      </div>
      <div class="form__buttons form__field--full">
        <app-button>Confirm</app-button>
        <app-button color="red">Delete</app-button>
      </div>
    </form>
  </app-modal>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    ingredientId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const form = reactive({
      name: "",
      measuringUnit: "100g",
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
    const store = useStore();
    const ingredient = computed(() => {
      if (props.ingredientId) {
        const ingredientList = store.getters["ingredients/getAll"];
        return ingredientList.find((item) => item._id === props.ingredientId);
      }
    });
    const title = computed(() => {
      return props.ingredientId ? "Edit Ingredient" : "New Ingredient";
    });
    const submit = () => {
      console.log("SUBMIT");
    };
    const router = useRouter();
    const goBack = () => {
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
    return { form, unitOptions, title, submit, goBack };
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
  }
}
</style>
