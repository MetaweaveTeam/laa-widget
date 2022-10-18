import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { ArProfile } from 'arweave-account';

export const useAccountStore = defineStore("account", () => {
  const txid = ref();
  const addr = ref();
  const handle = ref();
  const profile = reactive({
    avatar: ref(),
    avatarUrl: ref(),
    banner: ref(),
    bannerUrl: ref(),
    handleName: ref(),
    name: ref(),
    email: ref(),
    bio: ref(),
    links: reactive({
      instagram: ref(),
      twitter: ref(),
      github: ref(),
    }),
    wallets: reactive({})
  });
  var arProfile = profile;
  const arAccount = reactive({
    txid: ref(),
    addr: ref(),
    handle: ref(),
    profile: profile
  });

  function setTxid(newTxid: string | null) {
    arAccount.txid = newTxid;
    txid.value = newTxid;
  }

  function setAddr(newAddr: string | null) {
    arAccount.addr = newAddr;
    addr.value = newAddr;
  }

  function setHandle(newHandle: string | null) {
    arAccount.handle = newHandle;
    handle.value = newHandle;
  }

  function setProfile(newProfile: ArProfile) {
    profile.avatar = newProfile.avatar;
    profile.avatarUrl = newProfile.avatarURL;
    profile.banner = newProfile.banner;
    profile.bannerUrl = newProfile.bannerURL;
    profile.handleName = newProfile.handleName;
    profile.name = newProfile.name;
    profile.email = newProfile.email;
    profile.bio = newProfile.bio;
    profile.links.instagram = newProfile.links.instagram;
    profile.links.github = newProfile.links.github;
    profile.links.twitter = newProfile.links.twitter;
    profile.wallets = newProfile.wallets;
    arAccount.profile = profile;
    arProfile = profile;
  }

  return { txid, addr, handle, profile, arProfile, arAccount, setTxid, setAddr, setHandle, setProfile }
});
