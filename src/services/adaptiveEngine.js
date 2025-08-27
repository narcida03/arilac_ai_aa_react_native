export default class AdaptiveEngine {
  constructor() {
    this.skill = 1000;
    this.k = 24;
    this.lastRecommended = 2;
  }

  recordResult(correct) {
    const expected = 1 / (1 + Math.pow(10, ((this.lastRecommended*100 - this.skill)/400)));
    const score = correct ? 1.0 : 0.0;
    this.skill += this.k * (score - expected);
    this.lastRecommended = this.recommendDifficulty();
  }

  recommendDifficulty() {
    if (this.skill < 900) return 1;
    if (this.skill < 1050) return 2;
    if (this.skill < 1150) return 3;
    if (this.skill < 1250) return 4;
    return 5;
  }

  recommendedLabel() {
    const labels = ['Very Easy','Easy','Medium','Hard','Very Hard'];
    return labels[this.lastRecommended-1];
  }
}
