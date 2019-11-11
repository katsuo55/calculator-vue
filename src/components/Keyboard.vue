<template>
  <div class="l-keyboard">
    <div class="m-formula" v-bind:class="{ 'm-formulaActive': getIsInput }"><p class="m-formulaText">{{ getFormula }}</p></div>
    <div class="m-amount"><p class="m-amountText">{{ getAmount }}</p></div>
    <div class="m-keyboard">
      <ul class="m-keyboardLine">
        <li><ClearButton /></li>
        <li><BracketsButton brackets="(" /></li>
        <li><BracketsButton brackets=")" /></li>
        <li>
          <OperatorButton operator="÷">
            <i class="fas fa-divide"></i>
          </OperatorButton>
        </li>
      </ul>
      <ul class="m-keyboardLine">
      <li><NumberButton number="7" /></li>
      <li><NumberButton number="8" /></li>
      <li><NumberButton number="9" /></li>
      <li>
        <OperatorButton operator="×">
          <i class="fas fa-times"></i>
        </OperatorButton>
      </li>
    </ul>
      <ul class="m-keyboardLine">
        <li><NumberButton number="4" /></li>
        <li><NumberButton number="5" /></li>
        <li><NumberButton number="6" /></li>
        <li>
          <OperatorButton operator="-">
            <i class="fas fa-minus"></i>
          </OperatorButton>
        </li>
      </ul>
      <ul class="m-keyboardLine">
        <li><NumberButton number="1" /></li>
        <li><NumberButton number="2" /></li>
        <li><NumberButton number="3" /></li>
        <li>
          <OperatorButton operator="+">
            <i class="fas fa-plus"></i>
          </OperatorButton>
        </li>
      </ul>
      <ul class="m-keyboardLine">
        <li><DecimalPointButton /></li>
        <li><NumberButton number="0" /></li>
        <li><BackSpaceButton /></li>
        <li><EqualButton /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NumberButton from '@/components/modules/NumberButton'
import ClearButton from '@/components/modules/ClearButton'
import BracketsButton from '@/components/modules/BracketsButton'
import BackSpaceButton from '@/components/modules/BackSpaceButton'
import EqualButton from '@/components/modules/EqualButton'
import OperatorButton from '@/components/modules/OperatorButton'
import DecimalPointButton from '@/components/modules/DecimalPointButton'

export default {
  name: 'KeyBoard',
  components: {
    NumberButton,
    ClearButton,
    BracketsButton,
    BackSpaceButton,
    EqualButton,
    OperatorButton,
    DecimalPointButton
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters('KeyboardStore', {
      getIsInput: 'getIsInput',
      getFormula: 'getFormula',
      getAmount: 'getAmount'
    }),
  }
}
</script>

<style scoped lang="scss">
.m-formula {
  width: 100%;
  height: 10vh;
  text-align: end;
  font-size: 1.6rem;
  border-radius: 8px;
  border: 1px solid #ebebeb;

  &Active {
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    border: 1px solid #4d90fe;
  }

  &Text {
    margin: 0;
    padding: 20px;
    font-size: 1.6rem;
    overflow: scroll;
    white-space: nowrap;
  }
}

.m-amount {
  width: 100%;
  text-align: end;
  height: 8vh;

  &Text {
    margin: 0;
    padding: 10px 20px;
    font-size: 1.2rem;
    overflow: scroll;
    white-space: nowrap;
  }
}

.m-keyboardLine {
  display: flex;
  justify-content: space-around;
  margin: 1px 0;
}
ul, li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
