import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  const txid = ref('');
  const addr = ref('');
  const handle = ref('');
  const profile = reactive({});
  const arProfile = profile;
  const arAccount = reactive({
    txid: ref(''),
    addr: ref(''),
    handle: ref(''),
    profile: profile
  });

  function setTxid(newTxid: string) {
    arAccount.txid = newTxid;
    txid.value = newTxid;
  }

  function setAddr(newAddr: string) {
    arAccount.addr = newAddr;
    addr.value = newAddr;
  }

  function setHandle(newHandle: string) {
    arAccount.handle = newHandle;
    handle.value = newHandle;
  }

  return { txid, addr, handle, profile, arProfile, arAccount, setTxid, setAddr, setHandle }
});
