> +      return GeometryBox::ViewBox;
+  }
+}
+
+std::optional<ValueUnit> getOptionalValueUnit(
+    const std::unordered_map<std::string, RawValue>& rawShape,
+    const std::string& key) {
+  auto it = rawShape.find(key);
+  if (it != rawShape.end()) {
+    return toValueUnit(it->second);
+  }
+  return std::nullopt;
+}
+} // namespace
+
+std::optional<ClipPath> fromCSSClipPath(const CSSClipPath& cssClipPath) {
