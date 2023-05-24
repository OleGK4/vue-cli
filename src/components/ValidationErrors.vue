<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage"> {{ errorMessage }}</li>
  </ul>
</template>
<script> export default {
  name: 'AppValidationErrors', props: {
    validationErrors: {
      type: [Object, String],  // Добавляем тип String в массив типов
      required: true
    }
  }, computed: {
    errorMessages() {
      if (typeof this.validationErrors === 'string') {  // Добавляем проверку на строковый тип
        return [this.validationErrors]  // Возвращаем массив с одним элементом - переданной строкой
      }
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name}: ${messages}`
      })
    }
  }
}
</script>