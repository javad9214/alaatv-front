<template>
  <div class="Dashboard">
    <div class="user-info-section">
      <user-info-section :editable="true" />
    </div>
    <div class="wallet-cash-item">
      <wallet-cash-item />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'
import { User } from 'src/models/User'
import UserInfoSection from 'components/Template/SideBard/UserPanel/UserInfoSection.vue'
import WalletCashItem from 'components/Widgets/User/Dashboard/WalletCashItem.vue'

export default {
  name: 'Dashboard',
  components: { WalletCashItem, UserInfoSection },
  mixins: [mixinWidget, inputMixin],
  data() {
    return {
      isAdmin: false,
      user: new User(),
      isUserLogin: false
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
.Dashboard {
  display: flex;
  padding: 0 20px;
  align-items: flex-end;
  flex-direction: column;
  background: $blue-grey-1;
  .user-info-section{
    width: 100% ;
  }
  .wallet-cash-item{
    width: 100%;
  }

}
</style>
