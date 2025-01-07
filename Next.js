# نموذج لخطوات العمل لبناء ونشر موقع Next.js على GitHub Pages
#
# للبدء باستخدام Next.js، يمكنك زيارة: https://nextjs.org/docs/getting-started
#
name: نشر موقع Next.js على صفحات GitHub

on:
  # يتم التنفيذ عند الدفع إلى الفرع الافتراضي
  push:
    branches: ["main"]

  # يسمح لك بتشغيل هذا العمل يدويًا من علامة التبويب Actions
  workflow_dispatch:

# تعيين أذونات لـ GITHUB_TOKEN للسماح بالنشر على صفحات GitHub
permissions:
  contents: read
  pages: write
  id-token: write

# يسمح بتنفيذ نشر واحد فقط في الوقت نفسه، مع تخطي العمليات المتوقفة بين التشغيل الجاري وآخر متوقع.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # مهمة البناء
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: اكتشاف مدير الحزم
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "تعذر تحديد مدير الحزم"
            exit 1
          fi
      - name: إعداد Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: إعداد الصفحات
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next
      - name: استعادة التخزين المؤقت
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: تثبيت التبعيات
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: بناء باستخدام Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: إنشاء صفحة ثابتة
        run: ${{ steps.detect-package-manager.outputs.runner }} next export
      - name: رفع الأثر
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  # مهمة النشر
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: نشر على GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
