<script setup lang="ts">
import Account from 'arweave-account';
import type { ArAccount } from 'arweave-account';
import { run } from 'ar-gql';
import { useAccountStore } from '@/stores/account';
import Twitter from '@/components/icons/Twitter.vue';
import GitHub from '@/components/icons/GitHub.vue';
import Instagram from '@/components/icons/Instagram.vue';

const account = new Account();
const store = useAccountStore();
const query = `{
  transactions(
    first: 1
    tags: [{name:"Protocol-Name",values:"Account-0.2"}]
  ) {
    edges {
      node {
        id
        owner {
          key
          address
        }
        tags {
          name
          value
        }
        block {
          timestamp
        }
      }
    }
  }
}`;

const { setTxid, setAddr, setHandle, setProfile, setIsLoading, setError } = store;

run(query)
  .then((result) => {
    var address = result.data.transactions.edges[0].node.owner.address;
    return account.get(address);
  })
  .then((user: ArAccount) => {
    setTxid(user.txid);
    setAddr(user.addr);
    setHandle(user.handle);
    setProfile(user.profile);
  })
  .catch((e) => {
    console.log(e);
    setError(e);
  })
  .finally(() => {
    setIsLoading(false);
  });
</script>

<template>
  <div class="widget shadow-xl">
    <div v-if="store.isLoading">
      <span class="loading"></span>
    </div>
    <div v-else-if="store.error">
      {{ store.error }}
    </div>
    <div v-else>
      <div class="avatar">
        <div class="w-24 shadow-lg mask mask-hexagon">
          <a :href="'https://r.metaweave.xyz/u/' + store.addr">
            <img :src="store.profile.avatarUrl" class="bg-white" />
          </a>
        </div>
      </div>
      <div v-if="store.handle" class="pt-1">
        <a :href="'https://r.metaweave.xyz/u/' + store.addr" class="text-slate-200 text-sm">{{ store.handle }}</a>
      </div>
      <div v-if="store.profile.name" class="pt-2">
        <p class="text-white text-lg">{{ store.profile.name }}</p>
      </div>
      <div v-if="store.profile.bio" class="pt-1">
        <p class="text-slate-200">{{ store.profile.bio }}</p>
      </div>
      <div class="pt-4 mx-auto flex justify-center">
        <a class="px-4" v-if="store.profile.links.twitter" target="_blank"
          :href="'https://twitter.com/' + store.profile.links.twitter">
          <Twitter class="text-white" />
        </a>
        <a class="px-4" v-if="store.profile.links.github" target="_blank"
          :href="'https://github.com/' + store.profile.links.github">
          <GitHub class="text-white" />
        </a>
        <a class="px-4" v-if="store.profile.links.instagram" target="_blank"
          :href="'https://instagram.com/' + store.profile.links.instagram">
          <Instagram class="text-white" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget {
  display: flex;
  border-radius: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: rgb(188, 0, 255);
  background: -moz-linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
  background: -webkit-linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
  background: linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
}

.loading {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid #fff;
  border-radius: 50%;
  border-top-color: #1A1A1A;
  animation: spin 1s ease-in-out infinite;
}

a {
  text-shadow: 0px 0px 20px #000000;
}
</style>
