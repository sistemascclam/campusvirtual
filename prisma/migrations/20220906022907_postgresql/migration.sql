-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "deletedEmail" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "tipoDoc" INTEGER,
    "documento" TEXT,
    "nombres" TEXT,
    "paterno" TEXT,
    "materno" TEXT,
    "profesion" TEXT,
    "direccion" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "valuation" DOUBLE PRECISION,
    "image" TEXT,
    "price" DOUBLE PRECISION,
    "priceWODiscount" DOUBLE PRECISION,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    "ruta" TEXT,
    "texto" TEXT,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoKeyword" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "CursoKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopingCart" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ShopingCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leccion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cuerpo" TEXT,
    "url" TEXT,
    "orden" INTEGER DEFAULT 1,
    "duracion" DOUBLE PRECISION,
    "idCurso" INTEGER NOT NULL,

    CONSTRAINT "Leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelperLeccion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "orden" INTEGER DEFAULT 1,
    "leccionId" TEXT NOT NULL,

    CONSTRAINT "HelperLeccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "advance" INTEGER NOT NULL DEFAULT 0,
    "lastLeccion" TEXT,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountCodes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "monto" DECIMAL(10,2),
    "description" TEXT,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DiscountCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingHistory" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "monto" DECIMAL(10,2),
    "metadata" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShoppingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopintHistoryDetail" (
    "id" SERIAL NOT NULL,
    "idShopingHistory" INTEGER NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "monto" DECIMAL(10,2),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopintHistoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestedVoucher" (
    "id" TEXT NOT NULL,
    "file" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "amount" DOUBLE PRECISION,
    "amountDiscount" DOUBLE PRECISION,
    "idDescuento" INTEGER,
    "idUsuario" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aproved_date" TIMESTAMP(3),
    "denied_date" TIMESTAMP(3),
    "motivo" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RequestedVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestedVoucherDetail" (
    "id" SERIAL NOT NULL,
    "idRequestedVoucher" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "idCurso" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,

    CONSTRAINT "RequestedVoucherDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimBook" (
    "id" SERIAL NOT NULL,
    "tipoDoc" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT,
    "servicio" TEXT NOT NULL,
    "reclamo" TEXT NOT NULL,
    "solicitud" TEXT NOT NULL,

    CONSTRAINT "ClaimBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ipn" (
    "id" SERIAL NOT NULL,
    "response" TEXT,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ipn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CursoToCursoKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_ruta_key" ON "Curso"("ruta");

-- CreateIndex
CREATE UNIQUE INDEX "_CursoToCursoKeyword_AB_unique" ON "_CursoToCursoKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoToCursoKeyword_B_index" ON "_CursoToCursoKeyword"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopingCart" ADD CONSTRAINT "ShopingCart_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopingCart" ADD CONSTRAINT "ShopingCart_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leccion" ADD CONSTRAINT "Leccion_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelperLeccion" ADD CONSTRAINT "HelperLeccion_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lastLeccion_fkey" FOREIGN KEY ("lastLeccion") REFERENCES "Leccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingHistory" ADD CONSTRAINT "ShoppingHistory_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopintHistoryDetail" ADD CONSTRAINT "ShopintHistoryDetail_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopintHistoryDetail" ADD CONSTRAINT "ShopintHistoryDetail_idShopingHistory_fkey" FOREIGN KEY ("idShopingHistory") REFERENCES "ShoppingHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedVoucher" ADD CONSTRAINT "RequestedVoucher_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedVoucher" ADD CONSTRAINT "RequestedVoucher_idDescuento_fkey" FOREIGN KEY ("idDescuento") REFERENCES "DiscountCodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedVoucherDetail" ADD CONSTRAINT "RequestedVoucherDetail_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedVoucherDetail" ADD CONSTRAINT "RequestedVoucherDetail_idRequestedVoucher_fkey" FOREIGN KEY ("idRequestedVoucher") REFERENCES "RequestedVoucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToCursoKeyword" ADD FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToCursoKeyword" ADD FOREIGN KEY ("B") REFERENCES "CursoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
