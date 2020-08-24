export default function(state) {
    if (state.accessToken) {
      return { Authorization: 'Bearer ' + state.accessToken };
    } else {
      return {};
    }
  }