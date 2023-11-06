# proof-visualizer

## description
A general purpose visualizer for visualizing informal proofs (whether they be generated by a proof assistant or by humans)
Details of proofs can be put into collaspable sections. This way the reader can first start by reading the broad structure of the proof and then expand the sections they deem require further justification. This way the level of proof detail is dictated by the reader rather than the author. Additionally, the user can "click into" any part of the proof to see that proof state at that point.

## JSON api
A JSON API is exists which is used to feed into the proof-visualizer react component and which can be used by servers to easily serve up proof visualizations simply by changing the `proof.json`` file in the assets folder.