<template>
  <div class="WalletCashItem">
    <q-card>
      <q-icon name="ph:wallet" />
      <div>
        موجودی
      </div>
      <div>
        تومان
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'WalletCashItem'
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";

.WalletCashItem{
  width:100%;
.q-card{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: $grey-1;
  border-radius: $space-3;
  padding: 16px 20px 20px 20px;
  box-shadow: 2px 2px 3px 0 rgba(16, 24, 40, 0.06);
  .q-icon{
    font-size:$space-7;
    color:$secondary-6;
  }
}
}
</style>
